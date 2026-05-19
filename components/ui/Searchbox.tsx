interface SearchboxProps {
    children?: React.ReactNode;
}

export default function Searchbox({ children }: SearchboxProps) {
    return (
        <div className="ui-data-filter">
            
            <div className="form-item">
            {children}
                <div className="item">
                    <label>검색어</label>
                    <div className="input">
                        <input type="text" placeholder="검색어를 입력하세요"  className="form-control"/>
                    </div>
                    {/* <div className="input">
                        <select className="custom-select">
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="input">
                        <span className="radio"><input id="evtType4" name="evtTypeGroup" type="radio" /><label htmlFor="evtType4">출석</label></span>
                    </div>
                    <div className="input">
                        <span className="checkbox"><input id="evtType5" name="evtTypeGroup" type="checkbox" /><label htmlFor="evtType5">출석</label></span>
                    </div> */}

                </div>
                <div className="btn-filter-set">
                <button type="button" className="btn btn-sm"><span className="ico-search"></span>조회</button>
                </div>
                
            </div>
        </div>
    );
}