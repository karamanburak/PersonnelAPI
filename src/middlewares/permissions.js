"use strict";
/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */

//* Midllewares : permissions(authorization)

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.isActive) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission : You must login!");
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission : You must login and to be Admin!");
    }
  },
  isAdminOrOwn: (req, res, next) => {
    if (
      req.user &&
      req.user.isActive &&
      (req.user.isAdmin || req.user._id == req.params?.id)
    ) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error(
        "NoPermission : You must login and to be Admin or Owner!"
      );
    }
  },
  isAminorLead: (req, res, next) => {
    //* req.params.id => deparmenta ait id bilgisini verir!
    if (
      req.user &&
      req.user.isActive &&
      (req.user.isAdmin ||
        (req.user.isLead && req.user.departmentId == req.params?.id))
    ) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error(
        "NoPermission : You must login and to be Admin or Department Lead!"
      );
    }
  },
};
