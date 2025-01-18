import { Link } from "react-router-dom";
export default function Dashboard() {
    var courses = [
        {
            courseName: "React JS",
            courseNum: 1234,
            courseTitle: "Learn ReactJS Front end",
            courseImgSrc: "/images/reactJS.png"
        },
        {
            courseName: "Express JS",
            courseNum: 4567,
            courseTitle: "Learn ExpressJS server",
            courseImgSrc: "/images/expressJS.png"
        },
        {
            courseName: "Node JS",
            courseNum: 7890,
            courseTitle: "Learn NodeJS",
            courseImgSrc: "/images/nodeJS.png"
        },
        {
            courseName: "MongoDB",
            courseNum: 4678,
            courseTitle: "Learn database management",
            courseImgSrc: "/images/mongoDB.png"
        },
        {
            courseName: "Spring boot",
            courseNum: 6372,
            courseTitle: "Learn Springboot",
            courseImgSrc: "/images/springBoot.png"
        },
        {
            courseName: "HTML",
            courseNum: 3451,
            courseTitle: "Learn HTML",
            courseImgSrc: "/images/HTML.png"
        },
        {
            courseName: "CSS",
            courseNum: 8356,
            courseTitle: "Learn CSS styling",
            courseImgSrc: "/images/CSS.jpg"
        },
        {
            courseName: "Data Structures",
            courseNum: 4561,
            courseTitle: "Learn data structures",
            courseImgSrc: "/images/dataStructures.png"
        },
        {
            courseName: "Algorithms",
            courseNum: 6532,
            courseTitle: "Learn Algorithms",
            courseImgSrc: "/images/algorithms.jpg"
        },
        {
            courseName: "Mobile Development",
            courseNum: 4452,
            courseTitle: "Learn Swift and Kotlin",
            courseImgSrc: "/images/mobileDevelopment.jpg"
        }
    ];
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
            {
                courses.map((course) => (
                    <Course courseName={course.courseName} 
                    courseNum={course.courseNum} 
                    courseTitle={course.courseTitle}
                    courseImgSrc={course.courseImgSrc}/>
                ))
            }
        </div>
      </div>
    </div>
);}

const Course = ({courseName, courseNum, courseTitle, courseImgSrc}: courseProps) => {
    var courseLink = "/Kambaz/Courses/" + String(courseNum) + "/Home";
    return (
        <div className="wd-dashboard-course col" style={{width: "270px"}}>
            <div className="card rounded-3 overflow-hidden">
                <Link to={courseLink}
                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <img src={courseImgSrc} width="100%" height={160} />
                    <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title"> {courseName} </h5>
                    <p className="wd-dashboard-course-title card-text">
                        {courseTitle}  </p>
                    <button className="btn btn-primary"> Go </button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

interface courseProps {
    courseName: string;
    courseNum: number;
    courseTitle: string;
    courseImgSrc: string;
};