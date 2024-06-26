import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ApiComment from '../../apis/kang-blogging/comment';
import { IUSerMetadata } from '../../interfaces/model/user_metadata';
import { Avatar, Stack } from '@mui/material';
import { FormatRelativeTime } from '../../utils/convert';
import { useAppDispatch } from '../../hooks/useAppSelectorDitpatch';
import { MapErrorResponse } from '../../utils/map_data_response';
import { AxiosError } from 'axios';
import { setNotify } from '../../redux/reducers/notify';
import { VscDebugRestart } from 'react-icons/vsc';
import { IViolation } from '../../interfaces/model/violation';
import ApiViolation from '../../apis/kang-blogging/violation';
import { IoIosWarning } from 'react-icons/io';
import { FaUserTimes } from 'react-icons/fa';

const Violations: IViolation[] = [];

const ViolationsManagement = () => {
  const dispatch = useAppDispatch();
  const [pageState, setPageState] = useState({
    page: 0,
    pageSize: 20,
    total: 0,
    isLoading: true,
    data: Violations,
  });

  const columns1: GridColDef[] = [
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
    },
    {
      field: 'user',
      headerName: 'User',
      width: 250,
      renderCell: (params) => {
        const user = params.value as IUSerMetadata;
        return (
          <div className="ml-2 flex space-x-3 items-center">
            <Avatar src={user.avatar} />
            <p>{user.displayName}</p>
            {user.isActive == true ? (
              user.expireWarningTime != null ? (
                <div className="flex mt-2 items-center space-x-3">
                  <IoIosWarning color="yellow" />
                  <Tooltip
                    title={`The user has been banned from commenting ${FormatRelativeTime(
                      user.expireWarningTime,
                    )}`}
                  >
                    <p>Warning</p>
                  </Tooltip>
                </div>
              ) : (
                <div></div>
              )
            ) : (
              <div className="flex mt-2 items-center space-x-3">
                <FaUserTimes color="red" />
                <Tooltip title={`The user's account has been locked`}>
                  <p>Banned</p>
                </Tooltip>
              </div>
            )}
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
      field: '#',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" className="items-center w-full" spacing={1}>
          <Tooltip title="Delete">
            <div
              onClick={() => {
                handlerDeleteComment(params.row.id);
              }}
              className="hover:bg-slate-300"
            >
              <VscDebugRestart />
            </div>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const handlerDeleteComment = (comment_id: string) => {
    ApiComment.deleteComment(comment_id)
      .then(() => {
        setPageState((prevState) => ({
          ...prevState,
          data: prevState.data.filter((comment) => comment.id !== comment_id),
        }));
      })
      .catch((error) => {
        const e = MapErrorResponse((error as AxiosError).response);
        dispatch(
          setNotify({
            title: 'an occurred error',
            description: e.message,
            mustShow: true,
          }),
        );
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      ApiViolation.getViolations({
        page: pageState.page,
        pageSize: pageState.pageSize,
      }).then((rs) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          total: rs.data.data.pagination.total,
          data: rs.data.data.violations,
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

export default ViolationsManagement;
