<?php

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php $trees = new WP_Query( array(
			'post_type' => 'tree',
			'posts_per_page' => -1,
			'orderby' => 'title'
		) );

		if ( $trees->have_posts() ) : ?>
			<div class="grid-sizer"></div>
			<?php while ( $trees->have_posts() ) : $trees->the_post(); ?>
				<div class="tree-image">
					<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
				</div>
			<?php endwhile; ?>
		<?php endif; ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
