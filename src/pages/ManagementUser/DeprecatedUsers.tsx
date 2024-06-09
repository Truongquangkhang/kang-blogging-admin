import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IUSerMetadata } from '../../interfaces/model/user_metadata';
import Avatar from '@mui/material/Avatar';
import ApiUser from '../../apis/kang-blogging/user';
import { renderUserAction } from './Helper';
import { MapErrorResponse } from '../../utils/map_data_response';
import { useAppDispatch } from '../../hooks/useAppSelectorDitpatch';
import { AxiosError } from 'axios';
import { setNotify } from '../../redux/reducers/notify';
import { NotifyType } from '../../interfaces/model/notify';

const Users: IUSerMetadata[] = [];

const DeprecatedUsers = () => {
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
      width: 200,
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
  const handlerViewUser = (user_id: string) => {
    var url = process.env.KANG_BLOGGING_URL;
    console.log(url);
    if (url) {
      window.open(`${url}/user/${user_id}`);
    }
  };

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
        isActive: false,
      }).then((rs) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          total: rs.data.data.pagination.total,
          data: rs.data.data.users,
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
      />
    </Box>
  );
};

export default DeprecatedUsers;