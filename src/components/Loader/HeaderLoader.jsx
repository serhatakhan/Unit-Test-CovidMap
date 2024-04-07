const HeaderLoader = () => {
  return (
    <div data-testid="header-loader" className="flex items-center space-x-2 animate-pulse">
      <div className="w-14 h-14 bg-slate-400 rounded-sm" />
      <div className="w-[128px] h-4 bg-slate-500 rounded-sm" />
    </div>
  );
};

export default HeaderLoader;
