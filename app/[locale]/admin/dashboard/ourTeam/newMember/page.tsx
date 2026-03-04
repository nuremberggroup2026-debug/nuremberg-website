import { createMemberyAction } from "../(actions)/addNewMember";
import AddMemberForm from "@/components/ourTeam/AddMemberForm";
async function page() {
  

  return (
   <>
   <AddMemberForm  action={createMemberyAction}/>
   </>
  );
}

export default page;
