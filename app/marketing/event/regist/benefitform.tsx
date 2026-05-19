export default function BenefitForm({ register, errors }: { register: any, errors: any }) {
    const useType=[
        { label: '사용', value: '1' },
        { label: '미사용', value: '2' },
    ]
    const benefitList=[
        { label: '포인트 지급', value: '1' },
        { label: '상품 지급', value: '2' },
    ]
    return (
        <table className="table reg mt-10">
            <colgroup>
                <col style={{width: '160px'}} />
                <col style={{width: 'auto'}} />
                <col style={{width: '160px'}} />
            </colgroup>
            <tbody>
                <tr>
                    <th scope="row">선착순 설정<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td>
                        <div className="reg-group">
                            <div className="reg-item">
                                {useType.map((item, index) => (
                                    <span className="radio" key={index}>
                                        <input type="radio" name="useType" id={`useType${index}`} />
                                        <label htmlFor={`useType${index}`}>{item.label}</label>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </td>
                    <th scope="row">선착순 인원 설정<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td>
                        <div className="reg-group inline">
                            <div className="reg-item">
                                <input type="text" className="form-control" /> 명
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">지급 혜택<span className="ess"><span className="offscreen">필수입력</span></span></th>
                    <td colSpan={3}>
                        <div className="reg-group wp-100">
                            <div className="reg-item">
                                {benefitList.map((item, index) => (
                                    <span className="radio" key={index}>
                                        <input type="radio" name="benefitList" id={`benefitList${index}`} />
                                        <label htmlFor={`benefitList${index}`}>{item.label}</label>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="reg-group inline">
                            <div className="reg-item">
                                <input type="text" className="form-control" /> 원
                            </div>
                        </div>
                        <div className="table-util mt-10">
                            <div className="btn-set-m flex">
                                <button type="button" className="btn btn-ss">추가</button>
                                <button type="button" className="btn btn-ss">삭제</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
