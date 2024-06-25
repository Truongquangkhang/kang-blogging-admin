import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IComment } from '../../interfaces/model/comment';
import ApiComment from '../../apis/kang-blogging/comment';
import { IUSerMetadata } from '../../interfaces/model/user_metadata';
import { Avatar } from '@mui/material';
import { FormatRelativeTime } from '../../utils/convert';
import { renderActions, renderStatus } from './Helper';
import { useAppDispatch } from '../../hooks/useAppSelectorDitpatch';
import { MapErrorResponse } from '../../utils/map_data_response';
import { AxiosError } from 'axios';
import { setNotify } from '../../redux/reducers/notify';
import PopupSetCommentAsToxic from './PopupSetCommentAsToxic';

const Comments: IComment[] = [];

const ActiveComment = () => {
  const dispatch = useAppDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [pageState, setPageState] = useState({
    page: 0,
    pageSize: 20,
    total: 0,
    isLoading: true,
    data: Comments,
  });
  const [selectedRowId, setSelectedRowId] = useState('');

  const columns1: GridColDef[] = [
    {
      field: 'content',
      headerName: 'Comment',
      width: 500,
      renderCell: (params) => {
        return (
          <Tooltip title={params.value as string} placement="top" arrow>
            <p>{params.value}</p>
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
      renderCell: (params) => renderStatus(params),
    },
    {
      field: '#',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) =>
        renderActions(params, handlerDeleteComment, handlerSetCommentAsToxic),
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

  const handlerSetCommentAsToxic = (comment_id: string) => {
    setSelectedRowId(comment_id);
    setOpenPopup(true);
  };

  const changeStatusComment = (comment_id: string, currentStatus: boolean) => {
    setPageState((prevState) => ({
      ...prevState,
      data: prevState.data.map((comment) => {
        if (comment.id == comment_id) {
          comment.isToxicity = currentStatus;
        }
        return comment;
      }),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      ApiComment.getCommentsByParam({
        page: pageState.page,
        pageSize: pageState.pageSize,
        sortBy: 'created_at',
        isDeprecated: false,
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
    <Box sx={{ height: 600, width: '100%' }}>
      <PopupSetCommentAsToxic
        comment_id={selectedRowId}
        openPopUp={openPopup}
        closePopUp={() => {
          setOpenPopup(false);
        }}
        changeStatusComment={changeStatusComment}
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

export default ActiveComment;
