<?php

namespace App\Administration\Repository;

use App\Administration\Entity\Admquote;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Admquote|null find($id, $lockMode = null, $lockVersion = null)
 * @method Admquote|null findOneBy(array $criteria, array $orderBy = null)
 * @method Admquote[]    findAll()
 * @method Admquote[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AdmquoteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Admquote::class);
    }

    public function findRandomQuoteByLang(string $lang): array
    {
        $sql = <<<SQL
            SELECT quote, author FROM admquote q
            WHERE q.lang = :lang
            ORDER BY RANDOM()
            LIMIT 1
        SQL;

        $connection = $this->getEntityManager()->getConnection();

        try {
            $statement = $connection->prepare($sql);

            $result = $statement->executeQuery([
                'lang' => $lang,
            ])->fetchAssociative();

            if ($result === false) {
                throw new \Exception('No quote');
            }

            return $result;
        } catch (\Throwable) {
            return [
                'quote' => 'Follow your data',
                'author' => '',
            ];
        }
    }

    public function getDistinctLangs()
    {
        $qb = $this->createQueryBuilder('t');
        $qb->select('t.lang')
            ->distinct();

        $query = $qb->getQuery();

        return $query->getResult();
    }
}
