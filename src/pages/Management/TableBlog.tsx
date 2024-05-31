// // src/components/UserDataGrid.js
// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   { field: 'name', headerName: 'Name', width: 150 },
//   { field: 'email', headerName: 'Email', width: 200 },
// ];

// interface Prop {
//   rows: any;
//   rowCount: number;
//   page: any;
//   pageSize: number;
//   onPageChange: number;
//   onPageSizeChange: number;
// }

// const UserDataGrid = ({
//   rows,
//   rowCount,
//   page,
//   pageSize,
//   onPageChange,
//   onPageSizeChange,
// }: Prop) => {
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pagination
//         paginationMode="server"
//         rowCount={rowCount}
//         page={page}
//         pageSize={pageSize}
//         rowsPerPageOptions={[5, 10, 20]}
//         onPageChange={onPageChange}
//         onPageSizeChange={onPageSizeChange}
//         checkboxSelection
//       />
//     </div>
//   );
// };

// export default UserDataGrid;
