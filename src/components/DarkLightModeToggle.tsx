import { Root, Thumb } from '@radix-ui/react-switch';

interface Props {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DarkLightModeToggle: React.FC<Props> = ({
  isDarkMode,
  setIsDarkMode
}) => {
  return (
    <form className={`form ${isDarkMode ? '' : 'light-mode'}`}>
      <div className="label-toggle-wrapper">
        <label className="label" htmlFor="light-dark-mode">
          Toggle mode
        </label>
        <Root
          className="switch-root"
          id="light-dark-mode"
          onClick={() => setIsDarkMode((state) => !state)}
        >
          <Thumb className="switch-thumb" />
        </Root>
      </div>
    </form>
  );
};

export default DarkLightModeToggle;
