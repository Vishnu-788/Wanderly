import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  console.log("Reached userverify middleware");

  const token = req.cookies.accessToken;

  if (!token) {
    console.log("No token");

    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // attach user to req
    console.log("User verified");

    // You can add further checks here if needed:
    // like role-based or whatever

    next(); // allow through
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

// export const verifyUser =(req,res,next)=>{
//     verifyToken(req,res,next,()=>{
//         if(req.user.id === req.params.id || req.user.role ==='admin'){
//             next()
//         }else{
//           return  res.status(401).json({success:false,msg:"you're not authenticated"})
//         }
//     })
// }

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token. Access denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "Admins only." });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};
