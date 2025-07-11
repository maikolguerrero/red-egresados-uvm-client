import { useSelector } from "react-redux";

export default function AcademicRequests() {
    const academicRequests = useSelector((state) => state.academicRequests.academicRequests);
    return (
        <div className="text-center text-sm text-Negro mt-6 mb-10 w-[80%] md:w-[60%] lg:w-[40%]">
            <p>
                {academicRequests?.text}
                <br />
                <a href={`mailto:${academicRequests?.email}`} className="text-verdeC hover:underline font-medium">
                    {academicRequests?.email}
                </a>
            </p>
        </div>
    )
}
