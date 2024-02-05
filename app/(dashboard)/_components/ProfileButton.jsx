const ProfileButton = () => {
  return (
    <div className="cursor-pointer px-2 gap-[5px] sm:bg-[#EAEAEA] bg-transparent  w-auto h-auto sm:py-1 py-[2px] mt-[2px] flex rounded-lg">
      <img
        src={"/img/profil-header.png"}
        alt="Profil staff"
        className="w-[35px] h-[35px]"
      />
      <div className="sm:block hidden">
        <p className="font-medium text-[13px]">Nama: Lorem Ipsum</p>
        <p className="font-medium text-[13px]">NIP: 32837132</p>
      </div>
    </div>
  );
};

export default ProfileButton;
