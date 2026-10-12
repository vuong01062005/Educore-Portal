import { useEffect, useState } from 'react';

interface Course {
  _id: string;
  title: string;
  description: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  return (
    <ul>
      {courses.map((c) => (
        <li key={c._id}>{c.title}</li>
      ))}
    </ul>
  );
}