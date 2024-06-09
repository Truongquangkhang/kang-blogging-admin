import { GridRenderCellParams } from '@mui/x-data-grid';
import { ICategory } from '../../interfaces/model/category';
import { IUSerMetadata } from '../../interfaces/model/user_metadata';
import { Chip, Stack, Tooltip } from '@mui/material';
import { FormatRelativeTime } from '../../utils/convert';
import { HiOutlineBookmark, HiOutlineBookmarkSlash } from 'react-icons/hi2';
import { VscDebugRestart } from 'react-icons/vsc';

const renderAuthor = (params: GridRenderCellParams) => {
  const author = params.value as IUSerMetadata;
  return <p>{author.displayName}</p>;
};

const renderCategories = (params: GridRenderCellParams) => {
  const categories = params.value as ICategory[];
  const displayCategories = categories.slice(0, 1);
  const remainingCount = categories.length - displayCategories.length;

  return (
    <Tooltip
      className="cursor-pointer"
      title={
        <div>
          {categories.map((category) => (
            <div key={category.id}>{category.name}</div>
          ))}
        </div>
      }
      placement="top"
      arrow
    >
      <Stack direction="row" spacing={1}>
        {displayCategories.map((category) => (
          <Chip key={category.id} label={category.name} />
        ))}
        {remainingCount > 0 && <Chip label={`+${remainingCount} more`} />}
      </Stack>
    </Tooltip>
  );
};

const renderEditAt = (params: GridRenderCellParams) => {
  const timestamp = params.value as number;
  return <p>{FormatRelativeTime(timestamp)}</p>;
};

const renderStatus = (params: GridRenderCellParams) => {
  return params.value ? (
    <p className="px-1 py-2 w-3/4 text-center rounded-md text-xs bg-green-100">
      Published
    </p>
  ) : (
    <p className="px-1 py-2 w-3/4 text-center rounded-md text-xs bg-yellow-100">
      Draft
    </p>
  );
};

const renderActions = (
  params: GridRenderCellParams,
  handlerDeleteBlog: any,
  handlerMarkDraftOrPublishBlog: any,
  handlerViewBlog: any,
) => (
  <Stack direction="row" className="items-center w-full" spacing={1}>
    <div
      onClick={() => {
        handlerViewBlog(params.row.id);
      }}
    >
      <Tooltip title="View">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
        >
          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
        </svg>
      </Tooltip>
    </div>
    <div
      onClick={() => {
        handlerMarkDraftOrPublishBlog(params.row.id, params.row.published);
      }}
    >
      {params.row.published ? (
        <Tooltip title="Mark draft">
          <div className="bg-rgb(100 116 139) hover:bg-gray-3">
            <HiOutlineBookmarkSlash />
          </div>
        </Tooltip>
      ) : (
        <Tooltip title="public">
          <div className="bg-rgb(100 116 139) hover:bg-gray-3">
            <HiOutlineBookmark />
          </div>
        </Tooltip>
      )}
    </div>

    <Tooltip title="Delete">
      <svg
        onClick={() => {
          handlerDeleteBlog(params.row.id);
        }}
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
);

const renderActionsDeprecated = (
  params: GridRenderCellParams,
  handlerDeleteBlog: any,
  handlerViewBlog: any,
) => (
  <Stack direction="row" className="items-center w-full" spacing={1}>
    <div
      onClick={() => {
        handlerViewBlog(params.row.id);
      }}
    >
      <Tooltip title="View">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
        >
          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
        </svg>
      </Tooltip>
    </div>

    <Tooltip title="Undo">
      <div
        onClick={() => {
          handlerDeleteBlog(params.row.id);
        }}
      >
        <VscDebugRestart />
      </div>
    </Tooltip>
  </Stack>
);

export {
  renderActions,
  renderAuthor,
  renderCategories,
  renderEditAt,
  renderStatus,
  renderActionsDeprecated,
};
