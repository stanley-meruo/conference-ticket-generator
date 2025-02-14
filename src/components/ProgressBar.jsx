const ProgressBar = ({ step, stepLabels }) => {
  return (
    <div className="w-full mb-6 text-white">
      <div className=" py-2 flex justify-between items-center">
        <p className="text-2xl font-jeju">{stepLabels[step - 1]}</p>
        <p className="pt-2 text-sm font-roboto">
          Step {step}/{stepLabels.length}
        </p>
      </div>
      <div className="w-full bg-secondary h-1 rounded-full mt-2">
        <div
          className={`h-full bg-color rounded-full transition-all duration-300`}
          style={{ width: `${(step / stepLabels.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
