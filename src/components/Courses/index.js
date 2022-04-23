import Link from "next/link";
import Card from "./Card";

const Courses = ({ data }) => {
  return (
    <>
      <section className="container mx-auto px-4" id="new-class">
        <div className="flex items-center justify-between">
          <div className="w-auto">
            <p className="c-4 font-normal text-lg mb-1">New Classes</p>
            <p className="c-5 text-2xl font-medium">
              Summer <span className="c-3">Productive</span>
            </p>
          </div>
          <Link href="/courses">
            <a className="text-sm font-normal c-4 hover:underline">
              View All Course
            </a>
          </Link>
        </div>
        <div className="flex flex-wrap justify-start items-start -mx-4 mt-[30px]">
          {data?.length > 0 ? (
            data?.map((item, index) => {
              return <Card item={item} key={index} />;
            })
          ) : (
              <p className="text-center w-full">Courses not found...</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;
