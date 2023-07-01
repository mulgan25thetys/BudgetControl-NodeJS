module.exports = (req,res,module,datas,isPaginate) => {
    if (isPaginate) {
        return res.status(200).json(
            {
                message: require('./getListMessageOfModule')(module),
                data: require('./pagination')(req, datas)
            })
    } else {
        return res.status(200).json({
            message: require('./getListMessageOfModule')(module),
            data: datas
        })
    }
}