const paginate = require('jw-paginate')
const dotenv = require('dotenv')
dotenv.config()

module.exports = (req,datas) => {
    // get page from query params or default to first page
    const page = parseInt(req.query.page) || 1;
    const pageNumber = parseInt(req.query.number) || parseInt(process.env.NUMBER_PER_PAGE);

    // get pager object for specified page
    const pageSize = pageNumber;
    const pager = paginate(datas.length, page, pageSize);

    // get page of datas from datas array
    const pageOfDatas = datas.slice(pager.startIndex, pager.endIndex + 1);

    // return pager object and current page of datas
    return { pager, pageOfDatas };
}