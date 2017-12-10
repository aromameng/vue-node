import Mock from 'mockjs';
var Random = Mock.Random;

Mock.mock('http://g.cn', {
    'name'     : '@name',
    'age|1-100': 100,
    'color'    : '@color',
    'date' : Random.date('yyyy-MM-dd'),
    'pic' : Random.image('200x100', '#00405d', '#FFF', 'Mock.js'),
    'content':Random.paragraph(2)
});

export default Mock;