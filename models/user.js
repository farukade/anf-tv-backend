module.exports = (sequelize, dataType) => {
  const user = sequelize.define('user', {
    userName: {
      type: dataType.STRING,
      allowNull: false
    },
    email: {
      type: dataType.STRING,
      allowNull: false
    },
    password: {
      type: dataType.STRING,
      allowNull: false
    },
    userType: {
      type: dataType.STRING,
      allowNull: false
    },
    photo: {
      type: dataType.STRING(2048)
    }
  })
  return user;
}