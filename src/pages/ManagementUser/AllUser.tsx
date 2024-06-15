import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import ApiUser from '../../apis/kang-blogging/user';
import { renderUserAction } from './Helper';
import { MapErrorResponse } from '../../utils/map_data_response';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../hooks/useAppSelectorDitpatch';
import { setNotify } from '../../redux/reducers/notify';
import { NotifyType } from '../../interfaces/model/notify';
import { IUser } from '../../interfaces/model/user';

const Users: UserFullData[] = [];

export interface UserFullData {
  id: string;
  name: string;
  displayName: string;
  avatar?: string;
  description?: string | null;
  isActive: boolean;
  email: string;
  gender: boolean;
  createdAt: number;
  dateOfBirth?: number | null;
  totalBlogs: number;
  totalComments: number;
  totalFollowers: number;
  totalFolloweds: number;
  totalViolations: number;
  isFollowed: boolean;
  isFollower: boolean;
}

export const convertUserResponse = (user: IUser) => {
  var temp: UserFullData = {
    id: user.userInfo.id,
    name: user.userInfo.name,
    displayName: user.userInfo.displayName,
    avatar: user.userInfo.avatar,
    isActive: user.userInfo.isActive,
    description: user.userInfo.description,
    email: user.email,
    gender: user.gender,
    createdAt: user.createdAt,
    dateOfBirth: user.dateOfBirth,
    totalBlogs: user.totalBlogs,
    totalComments: user.totalComments,
    totalFolloweds: user.totalFolloweds,
    totalFollowers: user.totalFollowers,
    isFollowed: user.isFollowed,
    isFollower: user.isFollower,
    totalViolations: user.totalViolations,
  };
  return temp;
};

const AllUsers = () => {
  const dispatch = useAppDispatch();
  const columns1: GridColDef[] = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 100,
      renderCell: (params) => {
        return <Avatar src={params.value} />;
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
    },
    {
      field: `displayName`,
      headerName: `Display Name`,
      width: 150,
    },
    {
      field: 'totalBlogs',
      headerName: 'Total Blogs',
      width: 150,
    },
    {
      field: 'totalComments',
      headerName: 'Total Comments',
      width: 150,
    },
    {
      field: 'totalViolations',
      headerName: ' Total Violations',
      width: 150,
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        if (params.value) {
          return <p>ACTIVE</p>;
        } else {
          return <p>DEACTIVATED</p>;
        }
      },
    },
    {
      field: '#',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) =>
        renderUserAction(params, handleDeleteUser, handlerViewUser),
    },
  ];

  const handleDeleteUser = (user_id: string) => {
    ApiUser.deleteUser(user_id)
      .then(() => {
        setPageState((prevState) => ({
          ...prevState,
          data: prevState.data.filter((user) => user.id !== user_id),
        }));
      })
      .catch((err) => {
        const e = MapErrorResponse((err as AxiosError).response);
        dispatch(
          setNotify({
            title: 'an occurred error',
            description: e.message,
            mustShow: true,
            type: NotifyType.ERROR,
          }),
        );
      });
  };

  const handlerViewUser = (user_id: string) => {
    var url = process.env.KANG_BLOGGING_URL;
    console.log(url);
    if (url) {
      window.open(`${url}/user/${user_id}`);
    }
  };

  const [pageState, setPageState] = useState({
    page: 0,
    pageSize: 20,
    total: 0,
    isLoading: true,
    data: Users,
  });

  useEffect(() => {
    const fetchData = async () => {
      ApiUser.getUsers({
        page: pageState.page,
        pageSize: pageState.pageSize,
        isActive: true,
      }).then((rs) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          total: rs.data.data.pagination.total,
          data: rs.data.data.users.map((u) => convertUserResponse(u)),
        }));
      });
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);
  return (
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
        // getRowId={(row: IUser) => row.userInfo.id}
      />
    </Box>
  );
};

export default AllUsers;
