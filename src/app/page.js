import Register from "./Register";
import { createUniqueInviteCode } from "./firebase/fetch";

export default async function Home() {
    const inviteCode = await createUniqueInviteCode();

    return (
        <div>
            <div className="content">
            <Register inviteCode={inviteCode}/>
            </div>
        </div>
    );
}