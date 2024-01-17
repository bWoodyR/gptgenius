import { fetchOrGenerateTokens, fetchUserTokensById } from "@/utils/action";
import { UserButton, auth, currentUser } from "@clerk/nextjs";

const MemberProfile = async () => {
  const user = await currentUser();
  const { userId } = auth();

  await fetchOrGenerateTokens(userId as string);
  const currentTokens = await fetchUserTokensById(userId as string)

  return (
    <div className="px-4 flex flex-col items-center gap-2">
      <p>Tokens: {currentTokens}</p>
      <hr className="w-full" />
      <div className="px-4 flex items-center gap-2">
        <UserButton afterSignOutUrl="/"></UserButton>
        <p>{user?.emailAddresses[0].emailAddress}</p>
      </div>
    </div>
  );
};

export default MemberProfile;
