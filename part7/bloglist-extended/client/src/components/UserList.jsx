import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const UserList = ({ blogUsers }) => {
  return (
    <div>
      <h2 className="title">Users</h2>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogUsers.map((blogUser) => (
              <TableRow key={blogUser.id}>
                <TableCell>
                  <Link to={`${blogUser.id}`}>{blogUser.name}</Link>
                </TableCell>
                <TableCell>{blogUser.username}</TableCell>
                <TableCell>{blogUser.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
