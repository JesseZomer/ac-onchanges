import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
// import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from "@angular/common/http";
import { Apollo, ApolloModule } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GrandchildComponent } from './grandchild/grandchild.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    GrandchildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // GraphQLModule,
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(apollo: Apollo, httpLink: HttpLink) {
    const link = httpLink.create({ uri: 'http://localhost:3000/graphql' });

    apollo.create({
      link,
      cache: new InMemoryCache({ freezeResults: true }),
      assumeImmutableResults: true
    });
  }

}
