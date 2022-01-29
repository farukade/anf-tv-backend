module.exports = (sequelize, dataType) => {
  const news = sequelize.define('news', {
    subject: {
      type: dataType.STRING,
      allowNull: false
    },
    content: {
      type: dataType.STRING(19456),
      allowNull: false
    },
    category: {
      type: dataType.STRING,
      allowNull: false
    },
    media: {
      type: dataType.STRING(19719)
    },
    editorsPick: {
      type: dataType.BOOLEAN
    },
    topStory: {
      type: dataType.BOOLEAN
    }
  })
  return news;
}