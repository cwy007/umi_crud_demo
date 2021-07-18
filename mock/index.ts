import { CourseList, courseList } from './data';

// 获取路径参数
function getUrlParam(url: string, key: string) {
  // 获取参数
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)'); // 匹配目标参数
  var result = url.split('?')[1]?.match(reg); // 返回参数值
  var keywords = result ? decodeURIComponent(result[2]) : '';
  return keywords;
}

const getCourseList = (req: { url: string }, res: any) => {
  // console.log(req.url);
  let keywords = getUrlParam(req.url, 'keywords');
  let filterList =
    !keywords || keywords == ''
      ? courseList
      : courseList.filter((item: { type: string; name: string }) => {
          return (
            item.type.indexOf(keywords) !== -1 ||
            item.name.indexOf(keywords) !== -1
          );
        });
  res.send({
    success: true,
    datas: filterList,
    keywords: keywords,
  });
};

// 添加课程
const addCourse = (req: { body: CourseList }, res: any) => {
  let { type, name, totalPrice, amount, address } = req.body;
  courseList.unshift({
    id: Date.now().toString(),
    type,
    name,
    totalPrice,
    amount,
    address,
  });

  res.send({ msg: '添加成功', success: true });
};

// 获取编辑课程信息
const getEditCourse = (req: { url: string }, res: any) => {
  let id = getUrlParam(req.url, 'id');
  let index = courseList.findIndex((item: CourseList) => item.id == id);
  if (index == -1) {
    res.send({ msg: '该课程不存在', success: false });
  }

  res.send({ success: true, datas: courseList[index] });
};

// submit edit
const editCourse = (req: { body: CourseList }, res: any) => {
  let { id } = req.body;
  let index = courseList.findIndex((item: CourseList) => item.id == id);

  if (index == -1) {
    res.send({ msg: '该课程不存在', success: false });
  }

  courseList[index] = { ...req.body };

  res.send({ msg: '编辑成功', success: true });
};

// 删除课程信息
const deleteCourse = (req: { url: string }, res: any) => {
  let id = getUrlParam(req.url, 'id');
  let index = courseList.findIndex((item: CourseList) => item.id == id);
  if (index == -1) {
    res.send({ msg: '该课程不存在', success: false });
  }

  // 更新数据
  courseList.splice(index, 1);

  res.send({ success: true, msg: '删除成功' });
};

export default {
  '/api/courseList': getCourseList,
  '/api/dictionatyType': {
    datas: [
      { label: 'HTML', value: 'html' },
      { label: 'Javascript', value: 'Javascript' },
      { label: 'Node', value: 'Node' },
      { label: '工具', value: '工具' },
      { label: 'Vue', value: 'Vue' },
      { label: 'React', value: 'React' },
      { label: '微信小程序', value: '微信小程序' },
      { label: 'Flutter', value: 'Flutter' },
    ],
  },
  'POST /api/course/add': addCourse,
  '/api/course/editCourse': getEditCourse,
  'POST /api/course/edit': editCourse,
  'DELETE /api/course/delete': deleteCourse,
};
