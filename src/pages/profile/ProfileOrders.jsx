import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Box, Stack, Pagination, useTheme, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useProfile from '../../hooks/useProfile';

export default function ProfileOrders() {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const {data, isLoading, isError} = useProfile();  
    const orders = data?.orders || [];

    const itemsPerPage = 10;
    const totalCount = data?.orders?.length || 0;
    const pagesCount = Math.ceil(totalCount / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

    if(isLoading)
        return(
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", my: 10}}>
                <CircularProgress sx={{color: "primary.main"}}/>
            </Box>
        ) 

    if(isError)return <Typography sx={{color: "red", textAlign: "center", py: 6 }}>{t("LoadingErrorCart")} </Typography>        

    return (
        <Box>
            <Typography variant="h5" fontWeight="700" mb={3}>
                {t("MyOrders")} ({data.orders?.length || 0})
            </Typography>

            <TableContainer sx={{width: {xs: "100%", md: "500px", lg: "750px"}}}>
                <Table>
                    <TableHead sx={{ backgroundColor: theme.palette.background.paper }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: '700' }}>Order ID</TableCell>
                            <TableCell sx={{ fontWeight: '700' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: '700' }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: '700' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: '700' }}>Payment</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {orders && orders.length > 0 ? (
                            paginatedOrders.map((order) => {                                
                                return (
                                    <TableRow key={order.id} sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                                        <TableCell>#{order.id}</TableCell>
                                        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>${order.amountPaid}</TableCell>
                                        <TableCell>
                                            <Chip label={order.status} 
                                                sx={{
                                                    fontWeight: 'bold',
                                                    backgroundColor: (theme) => 
                                                        order.status === "Active" 
                                                            ? theme.palette.info.dark
                                                            : order.status === "Received"
                                                            ? theme.palette.success.dark
                                                            : theme.palette.grey[600],

                                                    color: (theme) =>
                                                        order.status === "Active" 
                                                            ? theme.palette.info.contrastText
                                                            : order.status === "Received"
                                                            ? theme.palette.success.contrastText
                                                            : theme.palette.getContrastText(theme.palette.grey[600]),
                                                }} 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ color: order.paymentStatus === 'unpaid' ? 'error.main' : 'success.main' }}>
                                                {order.paymentStatus || 'Pending'}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                    {t("NoOrdersFound")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
           
            {pagesCount > 1 && (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                            <Pagination
                                count={pagesCount} 
                                page={page} 
                                onChange={(e, value) => setPage(value)} 
                                color="primary" 
                                size="large"
                                style={{direction: i18n.language === "ar"? "ltr": "ltr" }}
                            />
                        </Box>
                    )}
        </Box>
    );
}