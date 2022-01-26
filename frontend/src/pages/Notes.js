import NotesTable from "../components/NotesTable";

const Notes = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center gap-10">
            <div className="text-4xl font-bold">Marc1 Notes</div>
            <NotesTable />
        </div>
    );
}

export default Notes;