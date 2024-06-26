import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Stack } from '@mui/material';
import { FormatRelativeTime } from '../../utils/convert';
import { IViolation } from '../../interfaces/model/violation';
import ApiViolation from '../../apis/kang-blogging/violation';
import { IoIosWarning } from 'react-icons/io';
import { FaUserTimes } from 'react-icons/fa';
import { IUSerMetadata } from '../../interfaces/model/user_metadata';

const Violations: IViolation[] = [];

const ViolationsManagement = () => {
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
      field: 'type',
      headerName: 'Type',
      width: 100,
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
          <Tooltip title="Show">
            <div
              onClick={() => {
                handlerShowDetail(params.row.type, params.row.targetId);
              }}
              className="hover:bg-slate-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
              </svg>
            </div>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const handlerShowDetail = (type: string, target_id: string) => {
    var url = process.env.KANG_BLOGGING_URL;
    if (url) {
      window.open(`${url}/${type}/${target_id}`);
    }
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
