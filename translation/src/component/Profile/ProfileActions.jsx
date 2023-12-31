import { translationClearHistory } from "../../api/translation";
import { useUser } from "../../context/UserContext";
import { storageDelete, storageSave } from "../../utils/storage";
import { STORAGE_USER_KEY } from "../../utils/storageKey";

const ProfileActions = () => {
  const { user, setUser } = useUser();

  const handleClearHistoryClick = async () => {
    if (!window.confirm("Are you sure you want to clear?")) {
      return;
    }

    const [error] = await translationClearHistory(user.id);

    if (error !== null) return;

    const updateUser = {
      ...user,
      translations: [],
    };

    storageSave(STORAGE_USER_KEY, updateUser);
    setUser(updateUser);
  };

  const handleLogoutClick = () => {
    if (window.confirm("Are your sure?")) {
      storageDelete(STORAGE_USER_KEY);
      setUser(null);
    }
  };

  return (
    <>
      <div>
        <button className="btn-primary" onClick={handleClearHistoryClick}>Clear History</button>
        <br></br>
        <button className="btn-primary" onClick={handleLogoutClick}>Logout</button>
      </div>
    </>
  );
};

export default ProfileActions;
