import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { Image } from 'antd';
import { ElFormProps } from '@/components/el/ElForm';
import {
  AddBlue,
  DeleteRed,
  EditBlue,
  BatchBlue
} from '@/components/el/ElIcon';
import { getTagList, getCategoryList } from './service';
const errorImage =
  'data:image/png;base64,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';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '??????',
    align: 'center',
    dataIndex: 'fileCode',
    width: 100,
    render: (value, record) => (
      <Image
        width={48}
        height={36}
        src={`/coordinator/el-fsm-service/api/gallery/picture/${record.id}/show`}
        fallback={errorImage}
      />
    )
  },

  {
    title: '????????????',
    align: 'center',
    dataIndex: 'name',
    width: 200
  },
  {
    title: '????????????',
    align: 'center',
    dataIndex: 'sizeName',
    width: 100
  },
  {
    title: '????????????',
    align: 'center',
    dataIndex: 'suffix',
    width: 100
  },
  {
    title: '????????????',
    align: 'center',
    dataIndex: 'url',
    render: (value, record) => {
      return (
        <span>{value}?c={record.fileCode}</span>
        // <CopyToClipboard
        //   text={value}
        //   onCopy={() => {
        //     ElNotification({
        //       type: 'success',
        //       message: '????????????'
        //     });
        //   }}
        // >
        //   <span className='clickToCopySpan'>????????????</span>
        // </CopyToClipboard>
      );
    }
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '????????????',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '????????????'
        }
      }
    },
    {
      title: '????????????',
      name: 'suffix',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '????????????'
        }
      }
    },
    {
      title: '????????????',
      name: 'labelName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '????????????'
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  deleteLoading,
  handleDelete,
  editLoading,
  changeCategory
}): Array<ActionButtonProps> => {
  return [
    {
      text: '??????',
      key: 'create',
      icon: <AddBlue />,
      disabled: false,
      hidden: false,
      location: 'left',
      handleClick: () => handleCreate()
    },
    {
      text: '??????',
      key: 'edit',
      icon: <EditBlue />,
      disabled: editLoading,
      loading: editLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => handleEdit(selectedRowKeys)
    },
    {
      text: '??????',
      key: 'delete',
      icon: <DeleteRed />,
      disabled: deleteLoading,
      hidden: false,
      minSelection: 1,
      loading: deleteLoading,
      needConfirm: true,
      // maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => handleDelete(selectedRowKeys)
    },
    {
      text: '??????????????????',
      key: 'change',
      icon: <BatchBlue />,
      hidden: false,
      minSelection: 1,
      // maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => changeCategory(selectedRowKeys)
    }
  ];
};
const getCategoryEditForm = (): ElFormProps => {
  return {
    labelCol: { span: 4 },
    items: [
      {
        title: '????????????',
        name: 'albumId',
        span: 24,
        labelCol: {
          span: 4
        },
        rules: [
          {
            required: true,
            message: '?????????????????????!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            request: getCategoryList,
            transfer: {
              label: 'name',
              value: 'id'
            },
            placeholder: '??????????????????????????????'
          }
        }
      }
    ]
  };
};
const getEditForm = ({ formData }): ElFormProps => {
  if (formData.id) {
    return {
      labelCol: { span: 2 },
      items: [
        {
          title: '????????????',
          name: 'albumId',
          span: 24,
          labelCol: {
            span: 2
          },
          rules: [
            {
              required: true,
              message: '?????????????????????!'
            }
          ],
          formOption: {
            type: '$select',
            props: {
              request: getCategoryList,
              transfer: {
                label: 'name',
                value: 'id'
              },
              placeholder: '??????????????????????????????'
            }
          }
        },
        {
          title: '????????????',
          name: 'description',
          labelCol: {
            span: 2
          },
          span: 24,
          formOption: {
            type: '$input',
            props: {
              placeholder: '??????????????????????????????'
            }
          }
        },
        {
          title: '????????????',
          name: 'labels',
          span: 24,
          labelCol: {
            span: 2
          },
          formOption: {
            type: '$transfer',
            props: {
              selectedListTitle: '???????????????',
              toSelectListTilte: '??????????????????',
              transfer: {
                label: 'name',
                value: 'id'
              },
              request: getTagList
            }
          }
        }
      ]
    };
  } else {
    return {
      labelCol: { span: 2 },
      items: [
        {
          title: '????????????',
          name: 'albumId',
          span: 24,
          labelCol: {
            span: 2
          },
          rules: [
            {
              required: true,
              message: '?????????????????????!'
            }
          ],
          formOption: {
            type: '$select',
            props: {
              request: getCategoryList,
              transfer: {
                label: 'name',
                value: 'id'
              },
              placeholder: '??????????????????????????????'
            }
          }
        },
        {
          title: '????????????',
          name: 'description',
          labelCol: {
            span: 2
          },
          span: 24,
          formOption: {
            type: '$input',
            props: {
              placeholder: '??????????????????????????????'
            }
          }
        },
        {
          title: '????????????',
          name: 'labels',
          span: 24,
          labelCol: {
            span: 2
          },
          formOption: {
            type: '$transfer',
            props: {
              selectedListTitle: '???????????????',
              toSelectListTilte: '??????????????????',
              transfer: {
                label: 'name',
                value: 'id'
              },
              request: getTagList
            }
          }
        },
        {
          title: '????????????',
          name: 'fileCodes',
          labelCol: {
            span: 2
          },
          span: 24,
          rules: [
            {
              required: true,
              message: '???????????????!'
            }
          ],
          formOption: {
            type: '$pic-manager-upload',
            props: {
              multiple: true,
              fileListLen: 10
            }
          }
        }
      ]
    };
  }
};
export {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm,
  getCategoryEditForm
};
