import React from "react";
import CardBerita from "../../components/Card/CardBerita/CardBerita";

const BeritaContainer = ({berita}) => {
    return (
        <div style={
            {
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                flexBasis: '30%'
            }
        }>
            {
                berita && berita.map(item => {
                    return(
                        <CardBerita key={item.id} berita={item}/>
                    );
                })
            }
        </div>
    );
}

export default BeritaContainer;