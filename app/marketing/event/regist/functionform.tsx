export default function FunctionForm({ register, errors }: { register: any, errors: any }) {
    return (
        <table className="table reg mt-10">
            <colgroup>
                <col style={{width: '160px'}} />
                <col style={{width: 'auto'}} />
                <col style={{width: '160px'}} />
            </colgroup>
            <tbody>
                <tr>
                    <th scope="row">버튼 이벤트<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td>
                        <div className="reg-group">
                            <div className="reg-item">
                                <select className="custom-select">
                                    <option value="1">1</option>
                                </select>
                            </div>
                        </div>
                    </td>
                    <th scope="row">버튼 명<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td>
                        <div className="reg-group inline">
                            <div className="reg-item">
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <span className="input-guide">App에서 버튼에 표기할 버튼 명을 입력하십시오. (예: 참여하기)</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">외부 링크<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td colSpan={3}>
                        <div className="reg-group wp-100">
                            <div className="reg-item">
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
