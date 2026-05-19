'use client';

export default function FormTitle({ title, style }: { title: string, style?: React.CSSProperties }) {
    return (
        <div className="ui-title-3" style={style}>  
            <h3>{title}</h3>
            <div className="abs title-required"><span className="ess"></span> 표시는 필수항목입니다.</div>
        </div>
    )
}