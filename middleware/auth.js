const adminAuth = (req,res,next) => {
    const auth = "xyz";
    const header= "xyz1";
    if(header==auth) {
        next();
    } else {
       res.status(401).send("Unauthorized Admin");
    }
}

module.exports = {"adminAuth":adminAuth};