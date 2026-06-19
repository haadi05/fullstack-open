import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
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

const UserList = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: blogService.getUser,
  });

  if (result.isPending) {
    return <div>loading data...</div>;
  }

  const blogUsers = result.data;
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
                  <Link>{blogUser.name}</Link>
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
