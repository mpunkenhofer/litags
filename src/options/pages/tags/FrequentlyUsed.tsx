import * as React from "react";
import {useSetDocumentTitle} from "../../../common/hooks/setDocumentTitle";
import {i18n} from "../../../constants/i18n";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../common/rootReducer";
import { getFrequentlyUsed } from "../../../common/slices/frequentlyUsed";
import { Tag, FrequentlyUsed as FrequentlyUsedType } from "../../../common/types";
import TagButton from "../../../common/TagButton";
import { Spinner } from "react-bootstrap";

interface FrequentlyUsedContainerProps {
    frequentlyUsed: FrequentlyUsedType;
    onTagClicked: (tag: Tag) => () => void;
}

const FrequentlyUsedContainer: React.FunctionComponent<FrequentlyUsedContainerProps> = ({frequentlyUsed, onTagClicked}: FrequentlyUsedContainerProps) => {
    if (frequentlyUsed && frequentlyUsed.length > 0) {
        return (
            <div className='p-2 d-flex flex-wrap border rounded-lg justify-content-around bg-light'>
                {
                    frequentlyUsed.map(f => f[0])
                }
            </div>
        );
    } else return null;
};

export const FrequentlyUsed: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const {frequentlyUsed, loading} = useSelector((state: RootState) => state.frequentlyUsed);

    useEffect(() => {
        dispatch(getFrequentlyUsed());
    }, [dispatch]);

    useSetDocumentTitle(i18n.frequentlyUsed, 'LiTags');

    const onTagButtonClick = (tag: Tag) => (): void => {
        console.log(tag);
    };


    if (loading) {
        return (
            <div className='d-flex justify-content-center py-2 py-md-4'>
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    } else if(frequentlyUsed) {
        return (
            <>
                <h1 className={'display-4 pb-3 pb-mb-4'}>{i18n.frequentlyUsed}</h1>
                <FrequentlyUsedContainer frequentlyUsed={frequentlyUsed} onTagClicked={onTagButtonClick}/>
            </>
        );
    } else {
        return null;
    }
};