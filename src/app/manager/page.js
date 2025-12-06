import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { getUserFromSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ManagerPage() {
  const sessionUser = getUserFromSession();
  if (!sessionUser || sessionUser.role !== "manager") {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>You are not authorized to view this page.</Typography>
      </Container>
    );
  }

  await connectToDatabase();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  const users = await User.find({
    _id: { $in: orders.map((o) => o.userId).filter(Boolean) },
  }).lean();
  const userMap = Object.fromEntries(users.map((u) => [u._id.toString(), u]));

  const totalSum = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Manager Dashboard</Typography>
        <Button component={Link} href="/manager/graph">
          Graph data
        </Button>
      </Stack>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Total orders: {orders.length} | Total revenue: €{totalSum.toFixed(2)}
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o._id.toString()}>
                <TableCell>{o._id.toString()}</TableCell>
                <TableCell>
                  {userMap[o.userId?.toString()]?.email || "Unknown"}
                </TableCell>
                <TableCell>
                  {new Date(o.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>€{(o.total || 0).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>No orders found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
