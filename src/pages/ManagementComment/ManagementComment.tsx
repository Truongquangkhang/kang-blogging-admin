import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IComment } from '../../interfaces/model/comment';
import ApiComment from '../../apis/kang-blogging/comment';
import { IUSerMetadata } from '../../interfaces/model/user_metadata';
import { Avatar } from '@mui/material';
import { FormatRelativeTime } from '../../utils/convert';

const columns1: GridColDef[] = [
  {
    field: 'content',
    headerName: 'Comment',
    width: 400,
    renderCell: (params) => {
      return (
        <Tooltip title={<div>{params.value}</div>} placement="top" arrow>
          {params.value}
        </Tooltip>
      );
    },
  },
  {
    field: 'user',
    headerName: 'User',
    width: 200,
    renderCell: (params) => {
      const user = params.value as IUSerMetadata;
      return (
        <div className="ml-2 flex space-x-3 items-center">
          <Avatar src={user.avatar} />
          <p>{user.displayName}</p>
        </div>
      );
    },
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 130,
    renderCell: (params) => {
      const timestamp = params.value as number;
      return <p>{FormatRelativeTime(timestamp)}</p>;
    },
  },
  {
    field: 'isToxicity',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => {
      if (params.value) {
        return <p className="bg-red-500 p-3">TOXIC</p>;
      } else {
        return <p className="bg-green-300 text-xs rounded p-2">NON-TOXIC</p>;
      }
    },
  },
  {
    field: '#',
    headerName: 'Actions',
    width: 150,
    renderCell: () => (
      <Stack direction="row" className="items-center w-full" spacing={1}>
        <Tooltip title="Edit">
          {/* <FaEye className="w-3 h-4" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
          >
            <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
          </svg>
        </Tooltip>
        <Tooltip title="Show">
          {/* <MdOutlineModeEdit className="w-3 h-4" /> */}
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            width="15"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m9.134 19.319 11.587-11.588c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-11.606 11.566c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 10.114-10.079 2.335 2.327-10.099 10.101z"
              fillRule="nonzero"
            />
          </svg>
        </Tooltip>
        <Tooltip title="Delete">
          {/* <MdDelete className="w-5 h-5" /> */}
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            width="15"
            height="17"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
              fillRule="nonzero"
            />
          </svg>
        </Tooltip>
      </Stack>
    ),
  },
];

const Comments: IComment[] = [];

const ManagementComment = () => {
  const [pageState, setPageState] = useState({
    page: 0,
    pageSize: 20,
    total: 0,
    isLoading: true,
    data: Comments,
  });

  useEffect(() => {
    const fetchData = async () => {
      ApiComment.getCommentsByParam({
        page: pageState.page,
        pageSize: pageState.pageSize,
      }).then((rs) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          total: rs.data.data.pagination.total,
          data: rs.data.data.comments.map((comment) => comment.commentInfo),
        }));
      });
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);
  return (
    <DefaultLayout>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[20, 30, 50, 70]}
          pagination
          page={pageState.page}
          pageSize={pageState.pageSize}
          // sortingMode="server"
          // filterMode="server"
          paginationMode="server"
          onPageChange={(newPage) => {
            setPageState((old) => ({ ...old, page: newPage }));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }
          columns={columns1}
          checkboxSelection
        />
      </Box>
    </DefaultLayout>
  );
};

export default ManagementComment;
