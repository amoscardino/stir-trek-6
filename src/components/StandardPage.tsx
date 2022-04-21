import { RefresherEventDetail } from "@ionic/core";
import {
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { forwardRef } from "react";
import { WithChildrenProps } from "../types/props";

interface StandardPageProps extends WithChildrenProps {
    /** Page title. Shows in the header bar. Will use large title styles on iOS. */
    title: string;

    /** If true, grid system will not be used.  */
    disableResponsive?: boolean;

    /** If true, a back button will be in the header start slot. Use for pages that are 
     * navigated to from other pages to enable going back.
     */
    showBackButton?: boolean;

    /** JSX to show inside an `IonButtons` element in the primary header slot. */
    primaryButton?: JSX.Element;

    /** JSX to show inside an `IonButtons` element in the secondary header slot. */
    secondaryButton?: JSX.Element;

    /** If defined, an `IonRefresher` component will be added to the `IonContent` fixed slot
     * and this handler will be called from `onIonRefresh`.
      */
    onPullToRefresh?: () => Promise<void>
}

const StandardPage = forwardRef<HTMLElement, StandardPageProps>((props, ref) => {
    const pullToRefreshHandler = async (event: CustomEvent<RefresherEventDetail>) => {
        await props.onPullToRefresh!();
        event.detail.complete();
    };

    return (
        <IonPage ref={ref}>
            <IonHeader translucent>
                <IonToolbar>
                    {props.showBackButton && (
                        <IonButtons slot="start">
                            <IonBackButton />
                        </IonButtons>
                    )}

                    {props.secondaryButton !== undefined && (
                        <IonButtons slot="secondary">
                            {props.secondaryButton}
                        </IonButtons>
                    )}

                    {props.primaryButton !== undefined && (
                        <IonButtons slot="primary">
                            {props.primaryButton}
                        </IonButtons>
                    )}

                    <IonTitle>{props.title}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{props.title}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                {props.onPullToRefresh !== undefined && (
                    <IonRefresher slot="fixed" onIonRefresh={pullToRefreshHandler}>
                        <IonRefresherContent pullingIcon="lines" refreshingSpinner="lines" />
                    </IonRefresher>
                )}

                {props.disableResponsive
                    ? props.children
                    : (
                        <IonGrid className="ion-no-padding">
                            <IonRow className="ion-justify-content-center">
                                <IonCol size="12" sizeSm="10" sizeMd="8" sizeLg="6" sizeXl="4">
                                    {props.children}
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    )}
            </IonContent>
        </IonPage>
    );
});

export default StandardPage;
