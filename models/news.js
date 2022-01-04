module.exports = (sequelize, dataType) => {
  const news = sequelize.define('news', {
    title: {
      type: dataType.STRING,
      allowNull: false
    },
    content: {
      type: dataType.STRING,
      allowNull: false
    },
    category: {
      type: dataType.STRING,
      allowNull: false
    },
    media: {
      type: dataType.STRING(9719)
    },
    editorsPick: {
      type: dataType.BOOLEAN
    },
    topNews: {
      type: dataType.BOOLEAN
    }
  })
  return news;
}