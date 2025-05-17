import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, useTheme, IconButton } from '@mui/material';
import { tokens } from '../../theme';
import { DataGrid } from '@mui/x-data-grid';
import { FiUserPlus, FiSearch, FiEdit2, FiUser, FiPhone, FiMail } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Use Font Awesome icons instead
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8080/api';

const CustomersPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    nic: '',
    phoneNumber: '',
    email: '',
    address: '',
    licenseNumber: '',
    status: 'Active',
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Token for API authentication
  const getAuthToken = () => localStorage.getItem('authToken');

  // Headers for API requests
  const getHeaders = () => ({
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });

  // Fetch all customers - Updated to use staff endpoint
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      // Updated endpoint from /customers to /staff/customers
      const response = await axios.get(`${API_BASE_URL}/staff/customers`, getHeaders());

      console.log('Response from /staff/customers:', response.data);
      
      // Transform the data to match our grid structure
      const formattedCustomers = response.data.map(customer => ({
        id: customer.id,
        name: `${customer.firstName} ${customer.lastName}`,
        firstName: customer.firstName,
        lastName: customer.lastName,
        nic: customer.nic || '',
        phone: customer.phoneNumber || '',
        email: customer.email,
        address: customer.address || '',
        licenseType: customer.licenseNumber ? 'Yes' : 'No',
        licenseNumber: customer.licenseNumber || '',
        registrationDate: new Date(customer.registeredAt).toISOString().split('T')[0],
        status: customer.isActive ? 'Active' : 'Inactive',
        isActive: customer.isActive
      }));
      
      setCustomers(formattedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  // Load customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle dialog open/close
  const handleOpenAddDialog = () => {
    setNewCustomer({
      firstName: '',
      lastName: '',
      nic: '',
      phoneNumber: '',
      email: '',
      address: '',
      licenseNumber: '',
      password: '', // Required for registration
      status: 'Active'
    });
    setShowPassword(false);
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenEditDialog = (customer) => {
    setSelectedCustomer(customer);
    setNewCustomer({
      firstName: customer.firstName,
      lastName: customer.lastName,
      nic: customer.nic,
      phoneNumber: customer.phone,
      email: customer.email,
      address: customer.address,
      licenseNumber: customer.licenseNumber,
      status: customer.status
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedCustomer(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value
    });
  };

  // Add new customer - Keep the registration endpoint the same
  const handleAddCustomer = async () => {
    try {
      // Add isActive to the customer registration data
      const registerData = {
        firstName: newCustomer.firstName,
        lastName: newCustomer.lastName,
        nic: newCustomer.nic,
        email: newCustomer.email,
        password: newCustomer.password,
        phoneNumber: newCustomer.phoneNumber,
        address: newCustomer.address,
        licenseNumber: newCustomer.licenseNumber,
        isActive: newCustomer.status === 'Active'
      };
      
      // Registration endpoint remains the same
      const response = await axios.post(
        `${API_BASE_URL}/customers/auth/register`, 
        registerData
      );
      
      toast.success('Customer added successfully');
      fetchCustomers(); // Refresh the list
      handleCloseAddDialog();
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error(error.response?.data?.message || 'Failed to add customer');
    }
  };

  // Update existing customer - Updated to use staff endpoint and include isActive
  const handleUpdateCustomer = async () => {
    try {
      const customerData = {
        firstName: newCustomer.firstName,
        lastName: newCustomer.lastName,
        nic: newCustomer.nic,
        phoneNumber: newCustomer.phoneNumber,
        email: newCustomer.email,
        address: newCustomer.address,
        licenseNumber: newCustomer.licenseNumber,
        isActive: newCustomer.status === 'Active' // Convert UI status to boolean
      };
      
      // Updated endpoint from /customers to /staff/customers
      await axios.put(
        `${API_BASE_URL}/staff/customers/${selectedCustomer.id}`, 
        customerData,
        getHeaders()
      );
      
      toast.success('Customer updated successfully');
      fetchCustomers(); // Refresh the list
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error(error.response?.data?.message || 'Failed to update customer');
    }
  };

  // Handle customer status toggle directly
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      const customerData = {
        isActive: newStatus === 'Active'
      };
      
      await axios.put(
        `${API_BASE_URL}/staff/customers/${id}/status`, 
        customerData,
        getHeaders()
      );
      
      toast.success(`Customer status changed to ${newStatus}`);
      fetchCustomers(); // Refresh the list
    } catch (error) {
      console.error('Error updating customer status:', error);
      toast.error(error.response?.data?.message || 'Failed to update customer status');
    }
  };

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
    (customer.nic && customer.nic.toLowerCase().includes(searchText.toLowerCase())) ||
    (customer.phone && customer.phone.toLowerCase().includes(searchText.toLowerCase()))
  );

  // DataGrid columns - Removed the delete action
  const columns = [
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <FiUser style={{ marginRight: '8px', color: colors.greenAccent[500] }} />
          {row.name}
        </Box>
      )
    },
    { field: 'nic', headerName: 'NIC', flex: 1 },
    { 
      field: 'phone', 
      headerName: 'Phone', 
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <FiPhone style={{ marginRight: '8px', color: colors.blueAccent[400] }} />
          {row.phone}
        </Box>
      )
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <FiMail style={{ marginRight: '8px', color: colors.blueAccent[400] }} />
          {row.email}
        </Box>
      )
    },
    { field: 'registrationDate', headerName: 'Registered', flex: 0.8 },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 0.7,
      renderCell: ({ row }) => (
        <Box
          width="80%"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            row.status === 'Active' ? colors.greenAccent[600] : colors.redAccent[600]
          }
          borderRadius="4px"
          sx={{ cursor: 'pointer' }}
          onClick={() => handleToggleStatus(row.id, row.status)}
        >
          <Typography color={colors.grey[100]}>
            {row.status}
          </Typography>
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.7,
      renderCell: ({ row }) => (
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleOpenEditDialog(row)}
            sx={{ minWidth: '30px', padding: '4px' }}
          >
            <FiEdit2 />
          </Button>
        </Box>
      )
    }
  ];

  return (
    <Box>
      <Typography variant="h2" fontWeight="bold" mb={4} color={colors.grey[100]}>
        Customer Management
      </Typography>

      {/* Header with search and add button */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px" width="400px">
          <FiSearch style={{ margin: '10px', color: colors.grey[400] }} />
          <TextField
            variant="standard"
            placeholder="Search customers..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ 
              ml: 1, 
              flex: 1,
              '& .MuiInput-root': {
                color: colors.grey[100],
                '&:before, &:after': {
                  borderBottom: 'none !important'
                }
              }
            }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<FiUserPlus />}
          onClick={handleOpenAddDialog}
          sx={{
            backgroundColor: colors.blueAccent[600],
            '&:hover': {
              backgroundColor: colors.blueAccent[700]
            }
          }}
        >
          Add Customer
        </Button>
      </Box>

      {/* Customers DataGrid */}
      <Box
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${colors.grey[800]} !important`,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid 
          rows={filteredCustomers} 
          columns={columns} 
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          loading={loading}
        />
      </Box>

      {/* Add Customer Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
          Add New Customer
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.primary[400], paddingTop: '20px !important' }}>
          <Box display="grid" gap="20px" gridTemplateColumns="repeat(2, 1fr)">
            <TextField
              fullWidth
              variant="filled"
              label="First Name"
              name="firstName"
              value={newCustomer.firstName}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Last Name"
              name="lastName"
              value={newCustomer.lastName}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="NIC"
              name="nic"
              value={newCustomer.nic}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Phone"
              name="phoneNumber"
              value={newCustomer.phoneNumber}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Email"
              name="email"
              value={newCustomer.email}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
            />
            <Box sx={{ gridColumn: "span 1", position: "relative" }}>
              <TextField
                fullWidth
                variant="filled"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={newCustomer.password}
                onChange={handleInputChange}
                sx={{ width: "100%" }}
              />
              <IconButton 
                onClick={togglePasswordVisibility}
                sx={{ 
                  position: "absolute", 
                  right: "14px", 
                  top: "14px", 
                  color: colors.grey[400],
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: colors.grey[100]
                  }
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </Box>
            <TextField
              fullWidth
              variant="filled"
              label="Address"
              name="address"
              value={newCustomer.address}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="License Number"
              name="licenseNumber"
              value={newCustomer.licenseNumber}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
            />
            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={newCustomer.status}
                onChange={handleInputChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: colors.primary[400], padding: '20px' }}>
          <Button onClick={handleCloseAddDialog} color="error" variant="contained">
            Cancel
          </Button>
          <Button 
            onClick={handleAddCustomer} 
            color="primary" 
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              '&:hover': {
                backgroundColor: colors.greenAccent[700]
              }
            }}
          >
            Add Customer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
          Edit Customer
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.primary[400], paddingTop: '20px !important' }}>
          <Box display="grid" gap="20px" gridTemplateColumns="repeat(2, 1fr)">
            <TextField
              fullWidth
              variant="filled"
              label="First Name"
              name="firstName"
              value={newCustomer.firstName}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Last Name"
              name="lastName"
              value={newCustomer.lastName}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="NIC"
              name="nic"
              value={newCustomer.nic}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Phone"
              name="phoneNumber"
              value={newCustomer.phoneNumber}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Email"
              name="email"
              value={newCustomer.email}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
              disabled // Email should not be editable
            />
            <TextField
              fullWidth
              variant="filled"
              label="Address"
              name="address"
              value={newCustomer.address}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="License Number"
              name="licenseNumber"
              value={newCustomer.licenseNumber}
              onChange={handleInputChange}
              sx={{ gridColumn: "span 1" }}
            />
            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={newCustomer.status}
                onChange={handleInputChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: colors.primary[400], padding: '20px' }}>
          <Button onClick={handleCloseEditDialog} color="error" variant="contained">
            Cancel
          </Button>
          <Button 
            onClick={handleUpdateCustomer} 
            color="primary" 
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              '&:hover': {
                backgroundColor: colors.greenAccent[700]
              }
            }}
          >
            Update Customer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomersPage;