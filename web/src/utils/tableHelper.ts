// 处理form 统一属性配置
export function filledFormConfig(form) {
  form.items.forEach((a) => {
    if (a.span) {
      return;
    }
    a.span = 6;
  });
}

// 处理表格列的统一属性配置
export function filledColumnsConfig(colums) {
  colums.forEach((a) => {
    if (a.align) {
      return;
    }
    a.align = 'center';
  });
}

export function filledColumnsEditAbleConfig(columns) {
  columns.forEach((a) => {
    if (!a.field) {
      return;
    }
    a.editable = true;
    // 若返回了一个string，则表示编辑类型，其他使用默认参数

    const val = a.field();
    if (typeof val == 'string') {
      a.field = (form) => {
        return {
          formOption: {
            type: val
          },
          name: a.dataIndex
        };
      };
    } else if (typeof val === 'object') {
      if (val.name != null) {
        return;
      } // 自定义了name,就不管了
      // 否则name == dataIndex
      val.name = a.dataIndex;
      a.field = (form) => {
        return val;
      };
    }
  });
}

// 根据列配置，获取初始化的行数据结构
export function getInitRowData(columns) {
  let data = {};
  columns.forEach((a) => {
    data[a.dataIndex] = null;
  });

  return data;
}

export function getDefaultEditFieldFunc(column) {
  return (form) => {
    return {
      formOption: {
        type: '$input'
      },
      name: column.dataIndex
    };
  };
}

export function getOptionsYN() {
  return [
    { label: '是', value: 1 },
    { label: '否', value: 0 }
  ];
}
export function getCellRenderYN() {
  return (value) => (value == 1 ? '是' : '否');
}

/**
 * 获取第一个表格的可视化高度
 * @param {*} extraHeight 额外的高度(表格底部的内容高度 Number类型,默认为20)
 * @param {*} id 当前页面中tableId
 */
export function getTableScroll(extraHeight: number, id: string) {
  let tHeader = null;
  tHeader = document.getElementById(id)
    ? document.getElementById(id).getElementsByClassName('ant-table-thead')[0]
    : null;

  //表格内容距离顶部的距离
  let tHeaderBottom = 0;
  if (tHeader) {
    tHeaderBottom = tHeader.getBoundingClientRect().bottom;
  }
  //窗体高度-表格内容顶部的高度-表格内容底部的高度
  let height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`;
  return height;
}
