import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MoreVertOutlined, EditOutlined } from "@mui/icons-material";
import RestorePageOutlinedIcon from "@mui/icons-material/RestorePageOutlined";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Pagination,
  IconButton,
  Menu,
} from "@mui/material";
import "@mui/icons-material";
import "@mui/material";
import "./AllCustomers.css";

// eslint-disable-next-line
const DeletedCustomers = () => {
  function createData(
    srNo,
    StockUpdateOn,
    ProcutDesc,
    category,
    Brand,
    Supplier,
    Price,
    Quantity,
    action
  ) {
    return {
      srNo,
      StockUpdateOn,
      ProcutDesc,
      category,
      Brand,
      Supplier,
      Price,
      Quantity,
      action,
    };
  }

  const rows = [
    createData(
      1,
      "Jul 13 2023",
      "Users Name",
      "Health & Wellness",
      "Test Blog Tes",
      "Protocol For Life Balance",
      "emerson ecologics (Bermuda)",
      "44.29",
      "Total Stock: 1"
    ),
    createData(
      2,
      "Jul 13 2023",
      "Users Name",
      "Health & Wellness",
      "Test Blog Tes",
      "Protocol For Life Balance",
      "emerson ecologics (Bermuda)",
      "44.29",
      "Total Stock: 1"
    ),
    createData(
      3,
      "Jul 13 2023",
      "Users Name",
      "Health & Wellness",
      "Test Blog Tes",
      "Protocol For Life Balance",
      "emerson ecologics (Bermuda)",
      "44.29",
      "Total Stock: 1"
    ),

    // Add more dummy data as needed
  ];

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setStatusFilter("all");
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  const filteredRows = rows.filter((row) => {
    const titleMatch = row.StockUpdateOn.toLowerCase().includes(
      searchText.toLowerCase()
    );
    const categoryMatch = row.category
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const statusMatch =
      statusFilter === "all" || row.Supplier.toLowerCase() === statusFilter;
    return titleMatch || categoryMatch || statusMatch;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>Deleted Customers</h3>
        </div>
        {/* Buttons End*/}
        <div className="main-body2">
          {/* Search and Nos */}
          <div className="searchAndNosBlogs">
            <div className="nos">
              Show <span className="spaces"></span>
              <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                label="Rows per page"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
              <span className="spaces"></span> entries
            </div>
            <div className="search-inventory">
              <div className="search-in-table">
                <OutlinedInput
                sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 },}} 
                  value={searchText}
                  onChange={handleSearchChange}
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="start">Search...</InputAdornment>
                  }
                />
              </div>
            </div>
          </div>
          {/* Search and Nos END */}

          {/* Table */}
          <TableContainer
            component={Paper}
            style={{ boxShadow: "none" }}
            id="tableContainer"
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    #
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Registered On
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Email Address
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Address
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="center">
                {displayedRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" align="center">
                      {row.srNo}
                    </TableCell>
                    <TableCell align="center">{row.StockUpdateOn}</TableCell>
                    <TableCell align="center">{row.ProcutDesc}</TableCell>
                    <TableCell align="center">
                      {row.category} <br />
                      {row.Supplier}
                    </TableCell>
                    <TableCell align="center">{row.Brand}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, row.srNo)}
                        size="small"
                      >
                        <MoreVertOutlined />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={openMenuId === row.srNo}
                        onClose={handleMenuClose}
                        PaperProps={{
                          style: {
                            maxHeight: 120,
                          },
                        }}
                      >
                        <Link to="/testDashboard/People/GeneralCustomers/edit-customers">
                          <MenuItem onClick={handleMenuClose}>
                            <EditOutlined
                              fontSize="small"
                              style={{ marginRight: "5px" }}
                            />{" "}
                            Edit
                          </MenuItem>
                        </Link>
                        <MenuItem onClick={handleMenuClose}>
                          <RestorePageOutlinedIcon
                            fontSize="small"
                            style={{ marginRight: "5px" }}
                          />{" "}
                          Restore
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Table End */}

          {/* Pagination */}
          <div className="pagination-style-p-inventory">
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              className="pagination-style"
              style={{
                display: "flex",
                // padding: "1rem",
                justifyContent: "right",
              }}
            />
          </div>
          {/* Pagination END */}
        </div>
      </div>
    </>
  );
};

export default DeletedCustomers;
