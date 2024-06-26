import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IUSerMetadata } from '../../interfaces/model/user_metadata';
import { Avatar, Stack } from '@mui/material';
import { FormatRelativeTime } from '../../utils/convert';
import { useAppDispatch } from '../../hooks/useAppSelectorDitpatch';
import { IoMdClose } from 'react-icons/io';
import ApiViolation from '../../apis/kang-blogging/violation';
import { IReport } from '../../interfaces/model/report';
import { MapErrorResponse } from '../../utils/map_data_response';
import { AxiosError } from 'axios';
import { setNotify } from '../../redux/reducers/notify';
import PopupSetCommentAsToxic from '../ManagementComment/PopupSetCommentAsToxic';

const Reports: IReport[] = [];

const ReportManagement = () => {
  const dispatch = useAppDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [pageState, setPageState] = useState({
    page: 0,
    pageSize: 20,
    total: 0,
    isLoading: true,
    data: Reports,
  });

  const columns1: GridColDef[] = [
    {
      field: 'reason',
      headerName: 'Reason',
      width: 100,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 100,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      renderCell: (params) => {
        const value = params.value as string;
        return (
          <Tooltip title={value}>
            <p>{value}</p>
          </Tooltip>
        );
      },
    },
    {
      field: 'user',
      headerName: 'Reporter',
      width: 250,
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
      field: 'isClosed',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => {
        if (params.value) {
          return (
            <p className="bg-red-300 w-full text-center text-xs rounded p-2">
              Closed
            </p>
          );
        } else {
          return (
            <p className="bg-green-300 w-full text-center text-xs rounded p-2">
              Open
            </p>
          );
        }
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
          <Tooltip title="Edit">
            <div
              onClick={() => {
                if (params.row.type == 'comment') {
                  setSelectedRowId(params.row.targetId);
                  setOpenPopup(true);
                }
              }}
            >
              <svg
                className="hover:bg-slate-300"
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
            </div>
          </Tooltip>
          {!params.row.isClosed ? (
            <Tooltip title="Close">
              <div
                onClick={() => {
                  hanlerCloseReport(params.row.id);
                }}
                className="hover:bg-slate-300"
              >
                <IoMdClose />
              </div>
            </Tooltip>
          ) : (
            <div></div>
          )}
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

  const hanlerCloseReport = (report_id: string) => {
    ApiViolation.closeReport(report_id)
      .then(() => {
        setPageState((prevState) => ({
          ...prevState,
          data: prevState.data.map((report) => {
            if (report.id == report_id) {
              report.isClosed = true;
            }
            return report;
          }),
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
      ApiViolation.getReports({
        page: pageState.page,
        pageSize: pageState.pageSize,
      }).then((rs) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          total: rs.data.data.pagination.total,
          data: rs.data.data.reports,
        }));
      });
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <PopupSetCommentAsToxic
        comment_id={selectedRowId}
        openPopUp={openPopup}
        closePopUp={() => {
          setOpenPopup(false);
        }}
        changeStatusComment={() => {}}
      />
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

export default ReportManagement;
