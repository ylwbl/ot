import request from '@/utils/request';

/**
 * 提交导出参数,获取导出信息
 * @name exportData
 * @param tmplCode 
 * @param queryParam 
 * @returns 
 */
export const fetchExportData = (prefix: string = '', tmplCode: string, queryParam?: any) => {
    return request(`${prefix}/com/import/${tmplCode}/export`, {
        method: 'post',
        query: {
            queryParam
        }
    });
};

/**
 * 后台导出文件进度查询
 * @name queryRate
 * @param prefix 
 * @param recordId 
 * @returns {} {
    success:boolean,
    data:{
        count:已导出数量,
        finish:是否导入完毕,
        rate:导入进度,
        total:记录总数
        }
    }
 */
export const fetchExportRate = (prefix: string = '', recordId: string) => {
    return request(`${prefix}/com/import/${recordId}/rate`, {
        method: 'get'
    });
};