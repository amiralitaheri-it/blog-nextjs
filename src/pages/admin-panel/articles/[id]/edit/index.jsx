import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

import {useDispatch} from "react-redux";

import {setLoading} from "@/store/slices/loading-slice";
import {editArticleFromService, getSingleArticleFromService} from "@/services/article-service";
import {editArticle} from "@/store/slices/article-slice";
import {sweetAlert} from "@/helpers/helpers";
import InputText from "@/components/ui/form/input-text";
import Textarea from "@/components/ui/form/textarea";

function Edit() {
    const dispatch = useDispatch();
    const router = useRouter();
    const articleId = router.query.id;

    const [newArticle, setNewArticle] = useState(null);

    useEffect(() => {
        getSingleArticle();
    }, [])

    const getSingleArticle = async () => {
        try {
            let article = await getSingleArticleFromService(articleId);
            setNewArticle({
                id: article.id,
                title: article.title,
                description: article.description,
                image: article.image,
                dataUri: article.dataUri,
                createdAt: article.createdAt,
            });
            dispatch(setLoading(false));
        } catch (error) {
            sweetAlert(error.response.data.message, 'error');
            dispatch(setLoading(false));
        }
    }

    const editArticleHandler = async (e) => {
        e.preventDefault();

        dispatch(setLoading(true));

        if (newArticle) {
            try {
                await editArticleFromService(newArticle);
                dispatch(editArticle(newArticle));
                setNewArticle(newArticle);
                dispatch(setLoading(false));
                sweetAlert('مقاله موردنظر با موفقیت ویرایش شد');
                router.push('/admin-panel/articles');
            } catch (error) {
                sweetAlert(error.response.data.message, 'error');
                dispatch(setLoading(false));
            }
        }
    }

    const setUpdatedArticle = (event) => {
        console.log(newArticle)
        setNewArticle({
            ...newArticle,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={(event) => editArticleHandler(event)}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-400">Update Article</h3>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                        <InputText labelName='Title' handler={setUpdatedArticle} nameAttr='title' defValue={newArticle?.title}/>
                        <Textarea labelName='Description' handler={setUpdatedArticle} nameAttr='description' defValue={newArticle?.description}/>
                        <InputText labelName='Image URL' handler={setUpdatedArticle} nameAttr='image' defValue={newArticle?.image}/>
                        <InputText labelName='Image BlurDataURL' handler={setUpdatedArticle} nameAttr='dataUri' defValue={newArticle?.dataUri}/>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Edit;

export async function getServerSideProps() {
    return {
        props: {},
    };
}