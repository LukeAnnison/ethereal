const ToggleSwitch = ({page, handleToggle,initialToggle, setInitialToggle}) => {

  return (
    <>
      {initialToggle === null ? <div></div> : <>
      {initialToggle ? <p>On</p> : <p>Paused</p>}
      <div className="toggle-switch">
        <input
          defaultChecked={initialToggle}
          type="checkbox"
          className="toggle-switch-checkbox"
          name="toggleSwitch"
          id="toggleSwitch"
          onChange={handleToggle}
        />
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
    </div>
  </>}
    </>
  );

};

export default ToggleSwitch;
